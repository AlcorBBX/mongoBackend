import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticatedGuard } from "./auth.guard";

export const Auth = () => UseGuards(AuthGuard('jwt'))