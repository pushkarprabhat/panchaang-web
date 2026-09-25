(function () {
  var s = document.currentScript;
  var city = (s && s.getAttribute("data-city")) || "Ahmedabad";
  var api = (s && s.getAttribute("data-api")) || "https://api.panchaang.in";
  var box = document.createElement("div");
  box.style.cssText =
    "font:14px/1.4 system-ui,sans-serif;max-width:280px;padding:12px 14px;border:1px solid #c4a882;border-radius:8px;background:#fff8f0;color:#222";
  box.textContent = "Panchaang…";
  s.parentNode.insertBefore(box, s.nextSibling);
  fetch(api + "/v1/panchang?city=" + encodeURIComponent(city))
    .then(function (r) { return r.json(); })
    .then(function (d) {
      box.innerHTML =
        "<strong>" + ((d.place && d.place.name) || city) + "</strong><br>Tithi " +
        d.tithi_number + " " + d.paksha;
    })
    .catch(function () {
      box.textContent = "Panchaang — " + city;
    });
})();
