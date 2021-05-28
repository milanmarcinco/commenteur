class App {

	#controlsForm = document.querySelector("#controls-form")
	#surveyIdInput = document.querySelector("#survey-id-input");
	#commentInput = document.querySelector("#comment-input");
	#indicator = document.querySelector(".indicator");

	constructor() {

		this.#controlsForm.addEventListener("submit", this._formSubmit.bind(this));

	}

	async _formSubmit(e) {
		try {
			e.preventDefault();

			const surveyId = this.#surveyIdInput.value;
			const comment = this.#commentInput.value;
			const action = e.submitter.dataset.action;

			if (!this._isIdValid(surveyId)) {
				return this._blinkRed();
			}

			let reqParams = {}
			switch (action) {
				case "search":
					reqParams = {
						method: "GET"
					}
					break;
				case "save":
					reqParams = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ comment })
					}
					break;
			}

			const data = await this._makeRequest(surveyId, reqParams);
			if (data.error) throw new Error(data.error.message);
			const { body: resBody } = data;

			this._renderData(resBody);
			this._blinkGreen();

		} catch (err) {
			this._blinkRed();
		}

	}

	_isIdValid(surveyId) {
		return surveyId !== "" && /^\d{6}$/.test(surveyId);
	}

	_createUrl(surveyId) {
		return `http://localhost:3000/api/commenteur?surveyId=${surveyId}`;
	}

	async _makeRequest(surveyId, reqParams) {
		try {
			const url = this._createUrl(surveyId);
			const res = await fetch(url, reqParams);
			const data = await res.json();
			return data;
		} catch (err) {
			throw new Error("Error while trying to fetch the data.");
		}
	}

	_renderData(resBody) {
		const { surveyId, comment } = resBody;
		this.#surveyIdInput.value = surveyId;
		this.#commentInput.value = comment;
	}

	_blinkGreen() {
		this.#indicator.classList.toggle("indicator--green");
		setTimeout(() => {
			this.#indicator.classList.toggle("indicator--green");
		}, 250);
	}

	_blinkRed() {
		this.#indicator.classList.toggle("indicator--red");
		setTimeout(() => {
			this.#indicator.classList.toggle("indicator--red");
		}, 250);
	}

}

const app = new App();