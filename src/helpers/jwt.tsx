import dayjs from 'dayjs';
import { log } from './log';

export const decodeJWT = (token: string, flag: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join(''),
        );

        const tokenDecode = JSON.parse(jsonPayload);

        const iatDate = dayjs.unix(tokenDecode.iat);
        const expDate = dayjs.unix(tokenDecode.exp);
        log(`${flag}/Thời gian phát hành (iat):`, iatDate.format('DD/MM/YYYY hh:mm:ss'), 'GREEN');
        log(`${flag}/Thời gian hết hạn (exp):`, expDate.format('DD/MM/YYYY hh:mm:ss'), 'GREEN');

        return tokenDecode;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
