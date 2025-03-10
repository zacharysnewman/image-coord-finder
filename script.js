document.addEventListener("DOMContentLoaded", () => {
	const imageUpload = document.getElementById("imageUpload");
	const image = document.getElementById("image");
	const redCrosshair = document.getElementById("redCrosshair");
	const blueCrosshair = document.getElementById("blueCrosshair");
	const clickedCoords = document.getElementById("clickedCoords");
	const copyButton = document.getElementById("copyButton");
	const xInput = document.getElementById("xInput");
	const yInput = document.getElementById("yInput");
	const goButton = document.getElementById("goButton");
	const mapButtons = document.querySelectorAll('.map-btn');

	// Function to position and show a crosshair
	function moveCrosshair(crosshair, x, y) {
		crosshair.style.left = `${x}px`;
		crosshair.style.top = `${y}px`;
		crosshair.style.display = "block";
	}

	// Handle image upload
	imageUpload.addEventListener("change", (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				image.src = e.target.result;
				image.style.display = "block";
			};
			reader.readAsDataURL(file);
		}
	});

	// Handle predefined map button click
	mapButtons.forEach(button => {
		button.addEventListener("click", () => {
			const mapImageURL = button.getAttribute("data-image");
			image.src = mapImageURL;
			image.style.display = "block"; // Make sure the image is visible
		});
	});

	// Image click event -> Move Red Crosshair (Last Clicked)
	image.addEventListener("click", (event) => {
		if (!image.src) return;

		const rect = image.getBoundingClientRect();
		const x = Math.round(event.clientX - rect.left);
		const y = Math.round(event.clientY - rect.top);

		clickedCoords.value = `${x}, ${y}`;
		moveCrosshair(redCrosshair, x, y);
	});

	// Go button event -> Move Blue Crosshair (Manual Input)
	goButton.addEventListener("click", () => {
		const x = parseInt(xInput.value, 10);
		const y = parseInt(yInput.value, 10);

		if (!isNaN(x) && !isNaN(y) && image.src) {
			moveCrosshair(blueCrosshair, x, y);
		}
	});

	// Copy button event (Copy Last Clicked Coordinates)
	copyButton.addEventListener("click", () => {
		clickedCoords.select();
		document.execCommand("copy");
		copyButton.textContent = "Copied!";
		setTimeout(() => copyButton.textContent = "Copy", 1000);
	});
});
