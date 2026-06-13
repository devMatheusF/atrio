import type { DatabaseHealthOutput } from "./types";

export interface HealthService {
  checkDatabase(): Promise<DatabaseHealthOutput>;
}
