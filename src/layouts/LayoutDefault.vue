<template>
  <div
    class="flex justify-center w-screen h-screen overflow-x-hidden bg-cover bg-scroll"
    style="background-image: url(/background-trianglify.svg)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault'
}
</script>
