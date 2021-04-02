import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImageController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.use(ensureAuthenticate);
carsRoutes.use(ensureAdmin);

carsRoutes.post("/", createCarController.handle);

carsRoutes.post("/:id/specifications", createCarSpecificationController.handle);

carsRoutes.post(
  "/:id/images",
  uploadCarImages.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
