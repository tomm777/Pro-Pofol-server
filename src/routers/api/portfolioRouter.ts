import { Router, Request, Response, NextFunction } from "express";
import { loginRequired } from "../../middlewares";
import { portfolioService } from "../../services";
import { CommentInfo } from "../../types/portfolio";
import { Types } from "mongoose";

const portfolioRouter = Router();

portfolioRouter.get(
  "/:portfolioId",
  // loginRequired,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { portfolioId } = req.params;
      const portfolio = await portfolioService.getPortfolioById(portfolioId);
      res.status(200).json(portfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.get(
  "/",
  // loginRequired,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const portfolios = await portfolioService.findAll();
      res.status(200).json(portfolios);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.post(
  "/",
  // loginRequired,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const newPortfolio = req.body;
      const createdPortfolio = await portfolioService.addPortfolioApplication(
        newPortfolio
      );
      res.status(201).json(createdPortfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.put(
  "/:portfolioId",
  // loginRequired,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { portfolioId } = req.params;
      const updatedData = req.body;
      const updatedPortfolio = await portfolioService.updatePortfolio(
        portfolioId,
        updatedData
      );
      res.status(200).json(updatedPortfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.delete(
  "/:portfolioId",
  // loginRequired,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { portfolioId } = req.params;
      const deleteResult = await portfolioService.deletePortfolio(portfolioId);
      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);
portfolioRouter.post(
  "/:portfolioId/comments",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { portfolioId } = req.params;
      const comment: CommentInfo = req.body;
      const updatedPortfolio = await portfolioService.addCommentToPortfolio(
        portfolioId,
        comment
      );
      res.status(201).json(updatedPortfolio);
    } catch (error) {
      next(error);
    }
  }
);

// 댓글 삭제
portfolioRouter.delete(
  "/:portfolioId/comments/:commentId",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { portfolioId, commentId } = req.params;
      const updatedPortfolio =
        await portfolioService.deleteCommentFromPortfolio(
          portfolioId,
          new Types.ObjectId(commentId)
        );
      res.status(200).json(updatedPortfolio);
    } catch (error) {
      next(error);
    }
  }
);

// 댓글 수정
portfolioRouter.put(
  "/:portfolioId/comments/:commentId",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { portfolioId, commentId } = req.params;
      const updatedComment: CommentInfo = req.body;
      const updatedPortfolio = await portfolioService.updateCommentInPortfolio(
        portfolioId,
        new Types.ObjectId(commentId),
        updatedComment
      );
      res.status(200).json(updatedPortfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.get(
  "/topCoached",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const portfolios = await portfolioService.findTopCoachedPortfolios();
      res.status(200).json(portfolios);
    } catch (error) {
      next(error);
    }
  }
);

export { portfolioRouter };