import React from 'react';
import replaceColorCodes from "./MinecraftColorCode";

function MinecraftText(text: string) {
    const parsedText = replaceColorCodes(text);

    return <div dangerouslySetInnerHTML={{ __html: parsedText.innerHTML }} />;
}

export default MinecraftText;