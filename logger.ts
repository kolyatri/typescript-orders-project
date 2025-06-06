interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}
export class ConsoleLogger implements Logger {
  info(message: string) {
    console.log(`[INFO] ${message}`);
  }
  warn(message: string) {
    console.log(`[WARN] ${message}`);
  }
  error(message: string) {
    console.log(`[ERROR] ${message}`);
  }
}
