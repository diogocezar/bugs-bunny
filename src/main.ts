import { BrowserWindow } from "electron";
import api from "./services/rabbitmq";

export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow;
  private static onWindowAllClosed() {
    if (process.platform !== "darwin") {
      Main.application.quit();
    }
  }

  private static onClose() {
    Main.mainWindow = null;
  }

  private static async onReady() {
    Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 });
    Main.mainWindow.loadURL("file://" + __dirname + "/public/index.html");
    const { data: connectionsData } = await api.get("connections");
    console.log(connectionsData);
    Main.mainWindow.on("closed", Main.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("ready", Main.onReady);
  }
}
