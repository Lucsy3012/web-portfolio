<template>
  <nav id="footer-social">
    <ul>
      <li v-for="(item, index) in socialLinks" :key="index">
        <a :href="item.href" target="_blank">
          <img
            :src="`/social-${item.name.toLowerCase()}.svg`"
            :alt="item.name"
            width="22"
            height="22"
            loading="lazy"
          >
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      socialLinks: [
        {
          name: "Instagram",
          href: "https://www.instagram.com/lucasdietrich_/",
        },
        {
          name: "Dribbble",
          href: "https://dribbble.com/Lucsy3012",
        },
        {
          name: "Figma",
          href: "https://www.figma.com/@LucasDietrich",
        },
        {
          name: "GitHub",
          href: "https://github.com/Lucsy3012",
        },
        {
          name: "Codepen",
          href: "https://codepen.io/lucsy3012",
        },
      ],
    }
  },
  computed: {
    navItems() {
      return Object.keys(this.$t('footer.navSocial'));
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "../assets/less/global";

#footer-social {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    li {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0;

      a {
        --transition-duration: .15s;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 22px;
        height: 22px;
        padding: 12px;
        box-sizing: content-box;
        .transit();

        &:hover {
          opacity: .5;
        }
      }
    }
  }
}
</style>
