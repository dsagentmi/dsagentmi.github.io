export const removeLatexCommands = (text:string)=>{
    text = text.replaceAll("{","").replaceAll("}","").replaceAll('\\"u','ü').replaceAll('\\"a','ä').replaceAll('\\"o','ö')
    text = text.replaceAll("\\'e","é").replaceAll("\\'a","á").replaceAll("\\'u","ú").replaceAll("\\'\\i","í").replaceAll("\\cs","ş").replaceAll("\\vs","š").replaceAll("\\'c","ć")
    text = text.replaceAll("--","-")

    //Todo: Add Sonderzeichen

    return text
}
