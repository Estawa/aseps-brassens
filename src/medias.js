// =====================================================================
// v1.8.0 — Envoi des photos, vidéos et documents des publications
// Les fichiers sont hébergés sur Cloudinary (gratuit, déjà utilisé pour Suivi AS) :
// la base en ligne ne garde que leur adresse, donc pas de limite de taille par page.
// =====================================================================

export const CLOUDINARY = {
  cloud: "sxmn7gfb",
  preset: "suivi_as_unsigned", // envoi « non signé » (pas de mot de passe dans le site)
  dossier: "aseps",
};

export const TAILLE_MAX_VIDEO = 100 * 1024 * 1024; // limite du forfait gratuit Cloudinary
export const TAILLE_MAX_DOC = 10 * 1024 * 1024;

// Réduit une photo (1600 px, JPEG) avant envoi : plus rapide sur téléphone, moins de place
export async function compresserImage(file, max = 1600, qualite = 0.82) {
  if (!file.type?.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") return file;
  try {
    const url = URL.createObjectURL(file);
    const img = await new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = url; });
    URL.revokeObjectURL(url);
    const r = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    const blob = await new Promise((ok) => c.toBlob(ok, "image/jpeg", qualite));
    return blob && blob.size < file.size ? new File([blob], (file.name || "photo").replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

// Photo de secours enregistrée directement dans la publication (si l'envoi en ligne échoue)
export async function imageEnDataUrl(file) {
  const petit = await compresserImage(file, 1000, 0.7);
  return new Promise((ok, ko) => { const fr = new FileReader(); fr.onload = () => ok(fr.result); fr.onerror = ko; fr.readAsDataURL(petit); });
}

// type : "image" | "video" | "raw" (documents PDF, Word…) ; onProgres(0..1)
export function envoyerFichier(file, type, onProgres) {
  return new Promise((ok, ko) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY.preset);
    fd.append("folder", CLOUDINARY.dossier);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY.cloud}/${type}/upload`);
    xhr.upload.onprogress = (e) => { if (e.lengthComputable && onProgres) onProgres(e.loaded / e.total); };
    xhr.onload = () => {
      try {
        const rep = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && rep.secure_url) ok(rep.secure_url);
        else ko(new Error(rep.error?.message || "Envoi refusé (" + xhr.status + ")"));
      } catch (e) { ko(e); }
    };
    xhr.onerror = () => ko(new Error("Pas de connexion internet ?"));
    xhr.send(fd);
  });
}

// Version réduite d'une photo hébergée (vignettes)
export function urlReduite(url, largeur = 800) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) return url;
  return url.replace("/image/upload/", `/image/upload/c_limit,w_${largeur},q_auto,f_auto/`);
}

// Lien YouTube -> identifiant de la vidéo
export function idYoutube(url) {
  const m = String(url || "").match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export function tailleLisible(o) {
  if (!o) return "";
  return o < 1024 * 1024 ? Math.max(1, Math.round(o / 1024)) + " Ko" : (o / 1024 / 1024).toFixed(1).replace(".", ",") + " Mo";
}
