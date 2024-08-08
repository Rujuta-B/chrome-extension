document
  .getElementById("extension-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const version = document.getElementById("version").value;
    const description = document.getElementById("description").value;

    const manifest = {
      manifest_version: 3,
      name: name,
      version: version,
      description: description,
      permissions: [],
      background: {
        service_worker: "background.js",
      },
      action: {
        default_popup: "popup.html",
        default_icon: {
          16: "icons/icon16.png",
          48: "icons/icon48.png",
          128: "icons/icon128.png",
        },
      },
      icons: {
        16: "icons/icon16.png",
        48: "icons/icon48.png",
        128: "icons/icon128.png",
      },
    };

    const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: "application/json",
    });
    const manifestUrl = URL.createObjectURL(manifestBlob);

    const output = document.getElementById("output");
    output.textContent = JSON.stringify(manifest, null, 2);

    const downloadLink = document.createElement("a");
    downloadLink.href = manifestUrl;
    downloadLink.download = "manifest.json";
    downloadLink.textContent = "Download manifest.json";
    output.appendChild(downloadLink);
  });
