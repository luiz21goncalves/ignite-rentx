import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ShowUserProfileCotroller } from "@modules/accounts/useCases/showUserProfile/ShowProfileController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showUserProfileController = new ShowUserProfileCotroller();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);

usersRoutes.use(ensureAuthenticate);

usersRoutes.get("/", showUserProfileController.handle);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
