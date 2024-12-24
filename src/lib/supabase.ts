import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const extractPathFromUrl = (url: string) => {
  const storageUrl = `${supabaseUrl}/storage/v1/object/public/blog-thumbnails/`;
  return url.replace(storageUrl, '');
};

export const deleteThumbnail = async (url: string) => {
  try {
    const filePath = extractPathFromUrl(url);
    const { error } = await supabase.storage
      .from("blog-thumbnails")
      .remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error: any) {
    throw new Error("Error deleting thumbnail: " + error.message);
  }
};

export const uploadThumbnail = async (file: File, oldUrl?: string) => {
  try {
    if (oldUrl) {
      await deleteThumbnail(oldUrl);
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage.from("blog-thumbnails").upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("blog-thumbnails").getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error: any) {
    throw new Error("Error uploading thumbnail: " + error.message);
  }
};
