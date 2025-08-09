import { ToolManifest } from './tools';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};

export type ApiError = {
  success: false;
  error: string;
  message: string;
  statusCode: number;
};

export type GetToolsResponse = ApiResponse<ToolManifest[]>;
export type UploadToolResponse = ApiResponse<{
  toolId: string;
  message: string;
}>;

export type UploadToolRequest = {
  file: File;
};

export type InstallToolRequest = {
  toolId: string;
  workspaceId: string;
};

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type AsyncState<T> = {
  data: T | null;
  loading: LoadingState;
  error: string | null;
};



