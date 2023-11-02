import * as dotenv from "dotenv";
import { Connection, ConnectionOptions, DataSource, createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
        path:nodeNameEnv
    })
  }

  public getEnvironment(k: string): string | undefined {
    return process.env[k]; // process.env.["PORT"]
  }
  public getNumberEnv(k: string): number {
    return Number(this.getEnvironment(k));
  }

  public get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"]; // string[]

    if (path.length > 0) {
        const stringToArray = path.split(".")
        arrEnv.unshift(...stringToArray)
    }
    return "." + arrEnv.join(".") ;
  }

  

  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}
