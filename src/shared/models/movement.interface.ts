import { MOVEMENT_TYPE } from "../enums/movement-type.enum";

export interface IMovement {
  my: MOVEMENT_TYPE;
  bot?: MOVEMENT_TYPE;
}
