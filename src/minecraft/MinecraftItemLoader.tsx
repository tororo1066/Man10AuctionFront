import * as nbt from 'prismarine-nbt';
import { promisify } from 'util';
import { Buffer} from "buffer";

const MinecraftItemLoader =  async (base64: string) => {
    console.log(base64);


    function decodeLines(s: string): Uint8Array {
        const buf: string[] = [];
        for (let ip = 0; ip < s.length; ip++) {
            const c = s.charAt(ip);
            if (c !== ' ' && c !== '\r' && c !== '\n' && c !== '\t') {
                buf.push(c);
            }
        }
        const cleanBase64 = buf.join('');
        return decodeBase64(cleanBase64);
    }

    function decodeBase64(base64: string): Uint8Array {
        const binaryString = atob(base64);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);

        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        return bytes;
    }

    const base64String = base64;
    const decodedBytes = decodeLines(base64String);
    console.log(decodedBytes);

    let data = await nbt.parse(Buffer.from(decodedBytes.buffer))
    data = nbt.simplify(data.parsed);
    console.log(data);
}


export default MinecraftItemLoader;