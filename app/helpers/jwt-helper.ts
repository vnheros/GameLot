import { Base64 } from 'js-base64';

export class JwtHelper {

  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    // This does not use btoa because it does not support unicode and the various fixes were... wonky.
    return Base64.decode(output);
  }

  public decodeToken(token: string): any {
    let parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    let decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string): Date {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}