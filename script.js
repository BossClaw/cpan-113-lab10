// ========================================================================
// GET TASKS

const output_get = document.getElementById('output_get');

// TASK 1 - FETCH GET
document.querySelector('#butt_get_fetch').addEventListener('click', () => {
	fetch('https://jsonplaceholder.typicode.com/posts/1')
		.then((response) => {
			if (!response.ok) {
				// THROW ERROR TO BE CAUGHT/CATCHED BELOW
				throw new Error(`Server response not OK! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((json) => {
			output_get.innerHTML = `<h2>${json.title}</h2><p>${json.body}</p>`;
		})
		.catch((err) => {
			output_get.innerHTML = `<p class="error">Fetch Error: ${err.message}</p>`;
		});
});

// TASK 2 - XMLHTTPREQUEST GET
document.querySelector('#butt_get_xhr').addEventListener('click', () => {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 300) {
			try {
				const data = JSON.parse(xhr.responseText);
				output_get.innerHTML = `<h2>${data.title}</h2><p>${data.body}</p>`;
			} catch (e) {
				output_get.innerHTML = `<p class="error">Error parsing JSON</p>`;
			}
		} else {
			output_get.innerHTML = `<p class="error">Request failed. Status: ${xhr.status}</p>`;
		}
	};

	xhr.onerror = () => {
		output.innerHTML = `<p class="error">Network error with XMLHttpRequest</p>`;
	};

	xhr.send();
});

// ================================================================================
// Task 3 - POST using fetch

const output_post_new = document.getElementById('output_post_new');
let new_post_id;

document.getElementById('post_form_new').addEventListener('submit', (e) => {
	// DON'T DO DEFAULT FORM ACTION
	e.preventDefault();

	// GET THE VALS
	// V2DO USE A formData SPREAD ... PERHAPS?
	const title = document.getElementById('title_new').value;
	const body = document.getElementById('body_new').value;

	// FETCH THE RESULT OF POSTING
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, body, userId: 1 }),
	})
		.then((response) => {
			if (!response.ok) {
				// THROW ERROR TO BE CAUGHT/CATCHED BELOW
				throw new Error(`Server response not OK! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((json) => {
			// STORE ID & SET ON UPDATE
			new_post_id = json.id;
			document.getElementById('id_update').value = new_post_id;
			document.getElementById('title_update').value = json.title;
			document.getElementById('body_update').value = json.body;
			output_post_new.innerHTML = `<p class="success">Post created! ID: ${json.id}</p><h2>${json.title}</h2><p>${json.body}</p>`;
		})
		.catch((err) => {
			output_post_new.innerHTML = `<p class="error">POST Error: ${err.message}</p>`;
		});
});

// ===========================================================================
// Task 4 - PUT using XMLHttpRequest

const output_put_update = document.getElementById('output_put_update');

document.getElementById('post_form_update').addEventListener('submit', (e) => {
	// DON'T DO DEFAULT FORM ACTION
	e.preventDefault();

	// GET FORM VALS
	const put_id = document.getElementById('id_update').value;
	const put_title = document.getElementById('title_update').value;
	const put_body = document.getElementById('body_update').value;
	const put_userId = 1;

	// CREATE THE URL
	const put_url = `https://jsonplaceholder.typicode.com/posts/${put_id}`;
	console.log(`[PUT] URL[${put_url}`);

	// CREATE THE JSON BODY
	const put_json_body_str = JSON.stringify({
		id: put_id,
		title: put_title,
		body: put_body,
		userId: put_userId,
	});
	console.log(`[PUT] JSON_BODY_STR`);
	console.log(put_json_body_str);

	// MAKE THE PUT VAL
	fetch(put_url, {
		method: 'PUT',
		body: put_json_body_str,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => {
			if (!response.ok) {
				output_put_update.innerHTML = `Error!! Server Response not OK! Status: ${response.status}`;
			}
			return response.json();
		})
		.then((json) => {
			// RETURNED THE UPDATED VALS!
			output_put_update.innerHTML = `<p class="success">Post updated!\n\nID: ${json.id}</p><h2>${json.title}</h2><p>${json.body}</p>`;
		})
		.catch((err) => {
			output_post_new.innerHTML = `<p class="error">POST Error: ${err.message}</p>`;
		});
});

// ======================================================================
// OPTIONAL - FETCH ALL

const output_fetch_posts = document.getElementById('output_fetch_posts');

document.querySelector('#butt_fetch_posts').addEventListener('click', () => {
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then((response) => {
			if (!response.ok) {
				// THROW ERROR TO BE CAUGHT/CATCHED BELOW
				throw new Error(`Server response not OK! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			output_fetch_posts.innerHTML = data
				// V2DO PROPER PAGINATION VIA REQUESTING PAGE START & AMOUNT IN GET
				// FAUX PAGINATION VIA SLICING
				.slice(0, 10)
				.map(
					(post) => `<h3>ID[${post.id}] ${post.title}</h3><p>${post.body}</p>
    `
				)
				.join('');
		})
		.catch((err) => {
			output_fetch_posts.innerHTML = `<p class="error">Fetch Error: ${err.message}</p>`;
		});
});
