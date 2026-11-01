// 作品カードをクリックすると、動画とスクショを詳細表示に並べる
const viewer = document.querySelector(".viewer");
const viewerContent = viewer.querySelector(".viewer-content");

document.querySelectorAll(".work").forEach((work) => {
  const media = work.querySelector(".work-media");
  if (work.dataset.video) {
    media.classList.add("has-video");
  }
  media.addEventListener("click", () => openViewer(work));
});

function openViewer(work) {
  viewerContent.replaceChildren();

  const videoId = work.dataset.video;
  if (videoId) {
    const iframe = document.createElement("iframe");
    iframe.className = "viewer-video";
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1`;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    viewerContent.append(iframe);
  }

  const title = document.createElement("h3");
  title.textContent = work.querySelector(".work-title").textContent;
  const desc = document.createElement("p");
  desc.textContent = work.querySelector(".work-desc").textContent;
  viewerContent.append(title, desc);

  work.querySelectorAll(".work-gallery img").forEach((img) => {
    viewerContent.append(img.cloneNode());
  });

  viewer.showModal();
}

viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());

// 背景をクリックしても閉じる
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) {
    viewer.close();
  }
});

// 閉じたら動画の再生を止める
viewer.addEventListener("close", () => viewerContent.replaceChildren());
