import {
  AnyAction,
  AsyncThunk,
  ActionReducerMapBuilder,
  createSlice,
  SerializedError,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export type IQueryParams = {
  query?: string;
  page?: number;
  size?: number;
  sort?: number;
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export function isRejectedAction(action: AnyAction) {
  return action.type.endsWith("/rejected");
}

export function isPendingAction(action: AnyAction) {
  return action.type.endsWith("/pending");
}

export function isFulfilledAction(action: AnyAction) {
  return action.type.endsWith("/fulfilled");
}

const commonErrorProperties: Array<keyof SerializedError> = [
  "name",
  "message",
  "stack",
  "code",
];

export const serializeAxiosError = (
  value: any
): AxiosError | SerializedError => {
  if (typeof value === "object" && value !== null) {
    if (value.isAxiosError) {
      return value;
    } else {
      const simpleError: SerializedError = {};
      for (const property of commonErrorProperties) {
        if (typeof value[property] === "string") {
          simpleError[property] = value[property];
        }
      }

      return simpleError;
    }
  }
  return { message: String(value) };
};

export interface EntityState<T> {
  loading: boolean;
  errorMessage: string | null;
  entities: ReadonlyArray<T>;
  entity: T;
  links?: any;
  updating: boolean;
  totalItems?: number;
  updateSuccess: boolean;
  type: any;
  date: Date | null;
  score: number;
  status: any;
  notes: string | null;
}

export const createEntitySlice = <
  T,
  Reducers extends SliceCaseReducers<EntityState<T>>
>({
  name = "",
  initialState,
  reducers,
  extraReducers,
  skipRejectionHandling,
}: {
  name: string;
  initialState: EntityState<T>;
  reducers?: ValidateSliceCaseReducers<EntityState<T>, Reducers>;
  extraReducers?: (builder: ActionReducerMapBuilder<EntityState<T>>) => void;
  skipRejectionHandling?: boolean;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      reset() {
        return initialState;
      },
      ...reducers,
    },
    extraReducers(builder) {
      extraReducers(builder);
      if (!skipRejectionHandling) {
        builder.addMatcher(isRejectedAction, (state, action) => {
          state.loading = false;
          state.updating = false;
          state.updateSuccess = false;
          state.errorMessage = action.error.message;
        });
      }
    },
  });
};
