<script context="module">
	export async function load({ params }) {
		const response = await fetch(`http://localhost:5000/api/recipes/${params.id}`);
		const recipe = await response.json();
		return { props: { recipe } };
	}
</script>

<script>
	import Header from '../../components/Header.svelte';
	export let recipe;
</script>

<Header />
<div style="width: 768px;" class="max-w-full p-6 mx-auto md:text-left text-center">
	<h1 class="text-3xl font-bold sm:text-4xl">{recipe.title}</h1>
	{#if recipe.servings}
		<p class="mt-1"><span class="font-bold">Servings:</span> {recipe.servings}</p>
	{/if}
	<img class="w-full my-4" src={recipe.imageurl} alt={recipe.title} />
	<h3 class="text-left font-semibold text-lg">{recipe.description}</h3>
	<hr class="h-0.5 my-4 border-0 bg-gray-200" />
</div>
<div
	style="width: 1028px;"
	class="flex flex-wrap gap-6 mx-auto pb-6 max-w-full md:flex-nowrap md:justify-center"
>
	<div class="md:basis-1/3 px-3">
		<h2 class="font-semibold text-xl">Ingredients</h2>
		{#each recipe.ingredients as ingredient}
			<p class="my-3">{ingredient}</p>
		{/each}
	</div>
	<div class="md:basis-2/3 px-3">
		<h2 class="font-semibold text-xl">Steps</h2>
		<ol class="list-decimal list-inside">
			{#each recipe.steps as step}
				<li class="my-2">{step}</li>
			{/each}
		</ol>
	</div>
</div>
