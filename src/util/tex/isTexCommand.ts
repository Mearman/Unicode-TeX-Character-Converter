export const isTexCommand = (tex: string): boolean => tex.startsWith("\\") && tex.replace(/^\\/g, "").length > 0;
