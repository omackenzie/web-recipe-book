<script>
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import {
		faMagnifyingGlass,
		faAngleLeft,
		faAngleRight,
		faPlus
	} from '@fortawesome/free-solid-svg-icons';
	import RecipePreview from '../components/RecipePreview.svelte';

	let recipes = [];
	let searchQuery = '';
	let previousQuery = '';
	let page = 1;
	let totalPages = 1;

	const nextPage = async () => {
		page += 1;
		searchRecipe();
	};

	const previousPage = async () => {
		page -= 1;
		searchRecipe();
	};

	const clearSearch = async () => {
		page = 1;
		searchQuery = '';
		previousQuery = '';
		searchRecipe();
	};

	const searchRecipe = async () => {
		if (searchQuery !== previousQuery) {
			page = 1;
		}
		const response = await fetch(
			`http://localhost:5000/api/recipes/search?q=${searchQuery}&page=${page}`
		);
		const resJSON = await response.json();
		recipes = resJSON.recipes;
		totalPages = resJSON.pages;
		previousQuery = searchQuery;
	};

	onMount(async () => {
		const response = await fetch('http://localhost:5000/api/recipes/search?q=&page=1');
		const resJSON = await response.json();
		recipes = resJSON.recipes;
		totalPages = resJSON.pages;
	});
</script>

<div class="background-image text-center py-24">
	<h1 class="text-5xl font-bold py-4 text-white text-shadow px-4">Web Recipe Book</h1>
	<div class="relative max-w-3xl mx-auto px-6 mt-4">
		<form on:submit|preventDefault={searchRecipe}>
			<button type="submit" class="absolute h-10 mt-1 pl-10 left-0 top-0 flex items-center">
				<Fa icon={faMagnifyingGlass} />
			</button>
			<input
				class="block w-full focus:outline-none focus:shadow text-gray-700 font-bold rounded-lg pl-12 pr-4 py-3 shadow-md"
				type="search"
				name="search"
				placeholder="Search by recipe or ingredient"
				bind:value={searchQuery}
			/>
		</form>
		{#if previousQuery}
			<button class="text-bold underline text-white text-lg mt-2" on:click={clearSearch}
				>Clear search</button
			>
		{/if}
	</div>
</div>
<a
	class="flex mx-auto items-center justify-between w-80 font-bold rounded-lg px-4 py-4 mt-8 border-2"
	href="/submit"
>
	Submit your own recipe
	<Fa icon={faPlus} />
</a>
<div class="text-center pt-10 xl:px-10">
	<h1 class="text-3xl font-semibold mb-6">Latest Recipes</h1>
	<div class="flex flex-wrap gap-6 justify-center">
		{#each recipes as recipe}
			<RecipePreview recipeId={recipe._id} title={recipe.title} imageurl={recipe.imageurl} />
		{/each}
	</div>
</div>
<div class="flex justify-center text-center mt-1 mb-4">
	{#if page == 1}
		<button class="p-2 disabled:text-gray-400" disabled><Fa icon={faAngleLeft} /></button>
	{:else}
		<button class="p-2" on:click={previousPage}><Fa icon={faAngleLeft} /></button>
	{/if}
	<p class="p-2">{page}</p>
	{#if page == totalPages}
		<button class="p-2 disabled:text-gray-400" on:click={nextPage} disabled
			><Fa icon={faAngleRight} /></button
		>
	{:else}
		<button class="p-2" on:click={nextPage}><Fa icon={faAngleRight} /></button>
	{/if}
</div>

<style>
	.background-image {
		background: rgba(0, 0, 0, 0.5)
			url('https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-blend-mode: darken;
	}

	.text-shadow {
		text-shadow: 4px 4px 4px rgb(0, 0, 0, 0.4);
	}
</style>
