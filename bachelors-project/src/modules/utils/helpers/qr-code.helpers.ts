import * as qr from "qrcode";

export async function generateQrCode(data: string){
    try{
        const qrCodeDataURL = await qr.toDataURL(data);
        return qrCodeDataURL;
    }catch (error) {
        throw new Error('Failed to generate QR code.');
    }
}