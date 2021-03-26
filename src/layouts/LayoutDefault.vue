<template>
  <div
    class="flex justify-center w-screen h-screen bg-scroll bg-cover"
    style="background-image: url(public/background-trianglify.svg)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault'
}
</script>
