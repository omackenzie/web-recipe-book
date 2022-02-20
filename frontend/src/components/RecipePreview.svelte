<script>
	export let recipeId;
	export let title;
	export let imageurl;
</script>

<a class="basis-4/5 md:basis-2/5 lg:basis-1/4" href="/recipe/{recipeId}">
	<img src={imageurl} alt={title} />
	<h3 class="font-semibold text-lg">{title}</h3>
</a>
