import { extname } from "path";

export class uploadVideoHelper {
  static customFileName(req: any, file: { mimetype: string | string[]; originalname: string; }, cb: (arg0: null | any, arg1: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`)
  }
   
  static destinationPath(req: any, file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, './public/videos')
  }
}