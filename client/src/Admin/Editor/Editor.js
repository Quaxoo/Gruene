import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import "./Editor.css";

import {ReactComponent as Undo} from "../../assets/icons/undo.svg"
import {ReactComponent as Redo} from "../../assets/icons/redo.svg"

import {ReactComponent as AlignLeft} from "../../assets/icons/align-left.svg"
import {ReactComponent as AlignCenter} from "../../assets/icons/align-center.svg"
import {ReactComponent as AlignRight} from "../../assets/icons/align-right.svg"

import {ReactComponent as Indent} from "../../assets/icons/indent.svg"
import {ReactComponent as Outdent} from "../../assets/icons/outdent.svg"

import {ReactComponent as Image} from "../../assets/icons/image.svg"
import {ReactComponent as Delete} from "../../assets/icons/delete.svg"
import {ReactComponent as Check} from "../../assets/icons/check.svg"

import {ReactComponent as UOList} from "../../assets/icons/unordered-list.svg"
import {ReactComponent as OList} from "../../assets/icons/ordered-list.svg"

import {ReactComponent as Link} from "../../assets/icons/link.svg"
import {ReactComponent as Close} from "../../assets/icons/close.svg"


const Editor = forwardRef(({ page }, ref) => {
  	const editorRef = useRef(null);
	const [lastColor, setLastColor] = useState("black");
	const [showImageModal, setShowImageModal] = useState(false);
  	const [images, setImages] = useState([]);

	const colors = [
		{ name: "Schwarz", value: "#000000" },
		{ name: "Grau", value: "#3b3b3b" },
		{ name: "Dunkelgrün", value: "#005437" },
		{ name: "Grün", value: "#066b2d" },
		{ name: "Blau", value: "#0BA1DD" },
		{ name: "Gelb", value: "#ffe600ff" },
	];

	const maxWidth = 651;
	const API_URL = "/uploads/";

	useEffect(() => {
		const editor = editorRef.current;
		if (!editor) return;

		const clearActive = () => {
		document.querySelectorAll(".img-wrapper").forEach(el => 
			el.classList.remove("active")
		);
		};

		editor.addEventListener("click", clearActive);

		return () => {
		editor.removeEventListener("click", clearActive);
		};
	}, []);

	useEffect(() => {
		if (page && editorRef.current) {
			editorRef.current.innerHTML = page; 
			setupImageWrappers();
		}	
  	}, [page]);

	useImperativeHandle(ref, () => ({
		getContent: () => {
			return editorRef.current ? editorRef.current.innerHTML : "";
		}
	}));

	const fetchImages = async () => {
		try {
			const res = await fetch(API_URL);
			const data = await res.json(); // z.B. ["bild1.png","bild2.jpg"]
			setImages(data);
		} catch (err) {
			console.error("Fehler beim Laden der Bilder", err);
		}
	};

  	// Generic execCommand Handler
  	const handleCommand = (command, value = null) => {
		const activeImg = document.querySelector(".img-wrapper.active");

		if (activeImg) {
			if (command === "removeImage") {
				activeImg.remove();
				return;
			}
			if (command === "justifyLeft") {
				activeImg.style.display = "block";
				activeImg.style.margin = "0 auto 0 0";
			}
			if (command === "justifyCenter") {
				activeImg.style.display = "block";
				activeImg.style.margin = "0 auto";
			}
			if (command === "justifyRight") {
				activeImg.style.display = "block";
				activeImg.style.margin = "0 0 0 auto";
			}
			if (command === "indent") {
				const currentLeft = parseInt(activeImg.style.marginLeft) || 0;
				const newLeft = currentLeft + 40;
				const width = activeImg.offsetWidth;

				if (newLeft + width <= maxWidth) {
					activeImg.style.marginLeft = newLeft + "px";
				}
			}
			if (command === "outdent") {
				const currentLeft = parseInt(activeImg.style.marginLeft) || 0;
      			activeImg.style.marginLeft = Math.max(currentLeft - 40, 0) + "px";
			}
			return;
		}

		document.execCommand(command, false, value);
		editorRef.current.focus();
  	};

  	const handlePaste = (e) => {
	e.preventDefault();
	const text = e.clipboardData.getData("text/plain");
	document.execCommand("insertText", false, text);
	};

	const insertImage = (url) => {
		const wrapper = document.createElement("div");
		wrapper.className = "img-wrapper";
		wrapper.contentEditable = "false";
		wrapper.tabIndex = 0;
		wrapper.addEventListener("click", (e) => {
			e.stopPropagation();
			document.querySelectorAll(".img-wrapper").forEach(el => el.classList.remove("active"));
			wrapper.classList.add("active");
		});

		const img = document.createElement("img");
		img.src = url;
		img.alt = "Vorschaubild"
		img.style.width = "300px"; // Startgröße
		img.style.height = "auto";
		img.style.display = "block";
		wrapper.appendChild(img);

		// Resize-Handle
		const handle = document.createElement("div");
		handle.style.position = "absolute";
		handle.style.right = "0";
		handle.style.bottom = "0";
		handle.style.width = "12px";
		handle.style.height = "12px";
		handle.style.background = "gray";
		handle.style.cursor = "nwse-resize";
		wrapper.appendChild(handle);

		// Resize-Logik
		let isResizing = false;
		let aspectRatio = 1;

		handle.addEventListener("mousedown", (e) => {
			e.preventDefault();
			isResizing = true;
			aspectRatio = img.width / img.height;

			const onMouseMove = (ev) => {
				if (!isResizing) return;

				const marginLeft = parseInt(wrapper.style.marginLeft) || 0;
				const newWidth = ev.clientX - wrapper.getBoundingClientRect().left;
				const finalWidth = Math.min(newWidth, maxWidth - marginLeft);

				img.style.width = finalWidth + "px";
				img.style.height = finalWidth / aspectRatio + "px";
			};

			const onMouseUp = () => {
				isResizing = false;
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
			};

			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);
		});

		// In Editor einfügen
		const sel = window.getSelection();
		if (sel && sel.rangeCount > 0) {
			const range = sel.getRangeAt(0);
			if (editorRef.current.contains(range.startContainer)) {
			range.insertNode(wrapper);
			} else {
			editorRef.current.appendChild(wrapper);
			}
		} else {
			editorRef.current.appendChild(wrapper);
		}
	};

	const setupImageWrappers = () => {
		const wrappers = editorRef.current.querySelectorAll(".img-wrapper");

		wrappers.forEach(wrapper => {
			const img = wrapper.querySelector("img");
			const handle = wrapper.querySelector(".resize-handle");

			// falls noch kein Handle existiert → neu erstellen
			if (!handle) {
			const newHandle = document.createElement("div");
			newHandle.className = "resize-handle";
			newHandle.style.position = "absolute";
			newHandle.style.right = "0";
			newHandle.style.bottom = "0";
			newHandle.style.width = "12px";
			newHandle.style.height = "12px";
			newHandle.style.background = "gray";
			newHandle.style.cursor = "nwse-resize";
			newHandle.contentEditable = "false";
			wrapper.appendChild(newHandle);
			}

			// Klick-Handler für Aktivierung
			wrapper.onclick = (e) => {
			document.querySelectorAll(".img-wrapper").forEach(el => el.classList.remove("active"));
			wrapper.classList.add("active");
			e.stopPropagation();
			};

			// Resize-Handler
			const resizeHandle = wrapper.querySelector(".resize-handle");
			if (resizeHandle) {
			resizeHandle.onmousedown = (e) => {
				e.preventDefault();
				const aspectRatio = img.width / img.height;
				let isResizing = true;

				const onMouseMove = (ev) => {
				if (!isResizing) return;
				const marginLeft = parseInt(wrapper.style.marginLeft) || 0;
				const newWidth = ev.clientX - wrapper.getBoundingClientRect().left;
				const finalWidth = Math.min(newWidth, maxWidth - marginLeft);
				img.style.width = finalWidth + "px";
				img.style.height = finalWidth / aspectRatio + "px";
				};

				const onMouseUp = () => {
				isResizing = false;
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
				};

				document.addEventListener("mousemove", onMouseMove);
				document.addEventListener("mouseup", onMouseUp);
			};
			}
		});
	};

	const deleteImageFromServer = async (filename) => {
		const sicher = window.confirm(`Willst du das Bild "${filename}" wirklich löschen?`);
		if (!sicher) return;

		try {
			await fetch(API_URL + filename, { method: "DELETE" });
			fetchImages(); // neu laden
		} catch (err) {
			console.error("Fehler beim Löschen", err);
		}
	};

	const uploadImage = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
		await fetch(API_URL, {
			method: "POST",
			body: formData,
		});
		fetchImages();
		} catch (err) {
			console.error("Fehler beim Hochladen", err);
		}
	};

	const openImageModal = () => {
		setShowImageModal(true);
		fetchImages();
	};


	return (
		<div className="editor">

		<div className="media">
			<button onClick={openImageModal}><Image/>Bild einfügen</button>
			<button onClick={() => handleCommand("removeImage")}><Delete/>Bild löschen</button>

			{showImageModal && (
				<div className="modal">
					<div className="modal-content">
						<h3>Bilder auswählen <div className="close-btn" onClick={() => setShowImageModal(false)}><Close/></div></h3>
						<div className="image-grid">
						{images.map((img) => (
							<div key={img} className="image-item">
							<img src={API_URL + img} alt={img} />
							<div className="image-actions">
								<button onClick={() => insertImage(API_URL + img) || setShowImageModal(false)}><Check/></button>
								<button onClick={() => deleteImageFromServer(img)}><Delete/></button>
							</div>
							</div>
						))}
						<div className="upload-item">
							<label className="upload-btn">
								Neues Bild hochladen
							<input type="file" onChange={uploadImage} hidden />
							</label>
						</div>
						</div>
					</div>
				</div>
			)}
		</div>	
		

		<div className="toolbar">
			<button title="Rückgängig" onClick={() => handleCommand("undo")}><Undo/></button>
  			<button title="Wiederholen" onClick={() => handleCommand("redo")}><Redo/></button>

			<select
				id="textType"
				name="textType"
				onChange={(e) =>
					handleCommand("formatBlock", e.target.value)
				}
				>
				<option value="p">Absatz</option>
				<option value="h1">Überschrift 1</option>
				<option value="h2">Überschrift 2</option>
				<option value="h3">Überschrift 3</option>
				<option value="h4">Überschrift 4</option>
				<option value="h5">Überschrift 5</option>
				<option value="h6">Überschrift 6</option>
			</select>

			<button title="Fett" onClick={() => handleCommand("bold")}><b>B</b></button>
			<button title="Kursiv" onClick={() => handleCommand("italic")}><i>I</i></button>

			<button title="Links Bündig" onClick={() => handleCommand("justifyLeft")}><AlignLeft/></button>
			<button title="Zentriert" onClick={() => handleCommand("justifyCenter")}><AlignCenter/></button>
			<button title="Rechts Bündig" onClick={() => handleCommand("justifyRight")}><AlignRight/></button>

			<button title="Einzug vergrößern" onClick={() => handleCommand("indent")}><Indent/></button>
			<button title="Einzug verkleinern" onClick={() => handleCommand("outdent")}><Outdent/></button>

			<button title="Unnummerierte Liste" onClick={() => handleCommand("insertUnorderedList")}><UOList/></button>
  			<button title="Nummerierte Liste" onClick={() => handleCommand("insertOrderedList")}><OList/></button>

			<button
				title="Link einfügen"
				onClick={() => {
					const text = prompt("Anzuzeigender Text:");
					const url = prompt("Link-URL:");

					if (url && text) {
					const sel = window.getSelection();
					if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
						// wenn Text markiert → einfach verlinken
						handleCommand("createLink", url);
					} else {
						// sonst eigenen <a> Node einfügen
						const a = document.createElement("a");
						a.href = url;
						a.textContent = text;
						a.target = "_blank"; // optional: Link in neuem Tab
						a.rel = "noreferrer"
						sel.getRangeAt(0).insertNode(a);
					}
					}
				}}
			>
			<Link/>
			</button>

			<div className="color-palette">
				{colors.map((c) => (
				<button
					key={c.value}
					className={`color-box ${lastColor === c.value ? "active" : ""}`}
					style={{ backgroundColor: c.value }}
					title={c.name}
					onClick={() => {
						setLastColor(c.value)
						handleCommand("foreColor", c.value)
					}}
				/>
				))}
			</div>

		</div>

		<div ref={editorRef} className="preview" contentEditable suppressContentEditableWarning onPaste={handlePaste}/>
		</div>
	);
});

export default Editor;
