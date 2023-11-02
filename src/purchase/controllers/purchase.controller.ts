import { PurchaseService } from "../services/purchase.service";
import { HttpResponse } from "../../shared/router/response/http.response";
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchase(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.findAllPurchase();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }

      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.findPurchaseById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.createPurchase(req.body);
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.purchaseService.updatePurchase(
        id,
        req.body
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en actualizar");
      }

      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deletePurchase(req: Request, res: Response) {
    try {
      const data: DeleteResult = await this.purchaseService.deletePurchase(
        req.params.id
      );
      if (!data.affected)
        return this.httpResponse.NotFound(
          res,
          "Hay un error al eliminar purchase"
        );
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
