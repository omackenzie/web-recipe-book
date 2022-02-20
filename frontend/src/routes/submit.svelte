<script>
	import Header from '../components/Header.svelte';
	import FormInput from '../components/FormInput.svelte';
	import { goto } from '$app/navigation';

	let title;
	let description;
	let servings;
	let imageurl;
	let ingredients;
	let steps;

	let errorMessage = '';

	const submitRecipe = async () => {
		errorMessage = '';
		if (!title) {
			errorMessage = 'The title field is required.';
		} else if (!imageurl) {
			errorMessage = 'The image URL field is required.';
		} else if (!ingredients) {
			errorMessage = 'The ingredients field is required.';
		} else if (!steps) {
			errorMessage = 'The steps field is required.';
		}

		if (!errorMessage) {
			const response = await fetch('http://localhost:5000/api/recipes/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					description,
					servings,
					imageurl,
					ingredients,
					steps
				})
			});
			const recipe = await response.json();
			goto(`/recipe/${recipe._id}`);
		}
	};
</script>

<Header />
<div class="h-full flex justify-center items-start bg-gray-200">
	<div style="width: 640px;" class="bg-white p-8 my-12 rounded-md shadow-md">
		<h2 class="font-bold text-3xl mb-6">Submit a Recipe</h2>

		<form on:submit|preventDefault={submitRecipe}>
			<FormInput label="Recipe Title" name="title" bind:bindValue={title} required />
			<FormInput label="Description" name="description" bind:bindValue={description} multiline />
			<FormInput label="Servings" name="servings" bind:bindValue={servings} />
			<FormInput label="Image URL" name="imageurl" bind:bindValue={imageurl} required />

			<hr class="h-0.5 my-6 border-0 bg-gray-500" />
			<FormInput
				label="Ingredients"
				name="ingredients"
				bind:bindValue={ingredients}
				required
				multiline
			/>
			<p class="text-gray-500 text-sm">Put each ingredient on its own line.</p>
			<FormInput label="Steps" name="steps" bind:bindValue={steps} required multiline />
			<p class="text-gray-500 text-sm">Put each step on its own line.</p>
			<hr class="h-0.5 my-6 border-0 bg-gray-500" />

			<p class="text-red-600">{errorMessage}</p>

			<button
				class="w-full p-4 mt-8 mb-2 border-none rounded font-semibold bg-black text-white"
				type="submit">Submit</button
			>
		</form>
	</div>
</div>
