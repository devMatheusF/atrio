export type DatabaseHealthStatus = "healthy" | "unhealthy";

export type DatabaseHealthOutput = {
  status: DatabaseHealthStatus;
  checkedAt: Date;
};
