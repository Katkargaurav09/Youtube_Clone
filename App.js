let allVideo = document.querySelector(".all-video");

window.fetch("http://localhost:3000/video").then(
  (d) => {
    d.json().then(
      (v) => {
        v.map((v, i) => {
          let div = document.createElement("div");
          div.classList.add("video-content");
          let { id, thumbnailUrl, description, title, views, uploadTime } = v;
          function formatViews(views) {
            views = parseInt(views.replace(/,/g, ""), 10);
            if (views >= 1000000) {
              return (views / 1000000).toFixed(1) + "M";
            }
            return views.toLocaleString();
          }
          console.log(v.title);
          div.innerHTML = `
          <aside class="image-content">
          <img onclick="handledImage(event,${id})" src="${thumbnailUrl}" alt="${id}">
          </aside>
          <aside class="image-details">
          <p><b>${title}</b></p>
          <p>${description.slice(0, 50) + "..."} </p>
          <div>
          <p>${formatViews(views)} views </p>
          <p>${uploadTime}</p>
          </div>
          </aside>
          `;
          allVideo.appendChild(div);
        });
      },
      (e) => console.log(e)
    );
  },
  (e) => console.log(e)
);

let title1 = document.querySelector(".title");
let desc = document.querySelector(".desc1");
let playVideo = document.querySelector(".video-play");

let handledImage = (e, id) => {
  window.fetch(`http://localhost:3000/video/${id}`).then(
    (d) => {
      d.json().then(
        (v) => {
          let {
            id,
            thumbnailUrl,
            description,
            videoUrl,
            title,
            views,
            uploadTime,
          } = v;
          playVideo.innerHTML = `<video src="${videoUrl}" controls></video>`;
          title1.innerHTML = title;
          desc.innerHTML = description;
        },
        (e) => console.log(e)
      );
    },
    (e) => {
      console.log(e);
    }
  );
};

let commentEnter = document.querySelector(".comment-enter");
let comment = document.querySelector("#comment");
let post = document.querySelector(".post-btn");

post.addEventListener("click", (e) => {
  commentEnter.innerHTML = comment.value;
});
