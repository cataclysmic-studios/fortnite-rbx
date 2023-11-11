import { RunService as Runtime } from "@rbxts/services";

const log = (category: keyof typeof Log, message: string): void =>
  print(`[${category.upper()}]: ${message}`);

namespace Log {
  export function info(message: string): void {
    log("info", message);
  }
  export function debug(message: string): void {
    if (!Runtime.IsStudio()) return;
    log("debug", message);
  }
  export function warning(message: string): void {
    log("warning", message);
  }
  export function softError(message: string): void {
    log("softError", message);
  }
}

export default Log;