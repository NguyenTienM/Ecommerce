// Mock data cho categories - dùng cho Men, Women, Kid pages
// Cấu trúc: Main Category → Sub Categories

export const categoriesData = {
  // ========== NAM (mens) ==========
  mens: [
    {
      id: "cat_m_01",
      name: "Áo thun",
      slug: "tshirt",
      image: "https://im.uniqlo.com/global-cms/spa/res6e9f93ee03fab84e6e66c69fd7024d41fr.jpg",
      subCategories: [
        { id: "cat_m_01_01", name: "Áo thun dài tay", slug: "long" },
        { id: "cat_m_01_02", name: "Áo thun ngắn tay", slug: "short" },
        { id: "cat_m_01_03", name: "Áo thun cơ bản", slug: "basic" },
        { id: "cat_m_01_04", name: "Áo thun họa tiết", slug: "graphic" }
      ]
    },
    {
      id: "cat_m_02",
      name: "Quần",
      slug: "pants",
      image: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455359/item/goods_09_455359.jpg",
      subCategories: [
        { id: "cat_m_02_01", name: "Quần jean", slug: "jean" },
        { id: "cat_m_02_02", name: "Quần kaki", slug: "kaki" },
        { id: "cat_m_02_03", name: "Quần short", slug: "short" },
        { id: "cat_m_02_04", name: "Quần jogger", slug: "jogger" }
      ]
    },
    {
      id: "cat_m_03",
      name: "Áo khoác",
      slug: "jacket",
      image: "https://im.uniqlo.com/global-cms/spa/resa479014c66c20cc6e9320396f98e8fdbfr.jpg",
      subCategories: [
        { id: "cat_m_03_01", name: "Áo hoodie", slug: "hoodie" },
        { id: "cat_m_03_02", name: "Áo bomber", slug: "bomber" },
        { id: "cat_m_03_03", name: "Áo khoác jean", slug: "denim" },
        { id: "cat_m_03_04", name: "Áo blazer", slug: "blazer" }
      ]
    },
    {
      id: "cat_m_04",
      name: "Áo sơ mi",
      slug: "shirt",
      image: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455972/item/goods_00_455972.jpg",
      subCategories: [
        { id: "cat_m_04_01", name: "Áo sơ mi công sở", slug: "formal" },
        { id: "cat_m_04_02", name: "Áo sơ mi thường", slug: "casual" },
        { id: "cat_m_04_03", name: "Áo sơ mi flannel", slug: "flannel" }
      ]
    }
  ],

  // ========== NỮ (womens) ==========
  womens: [
    {
      id: "cat_f_01",
      name: "Áo thun",
      slug: "tshirt",
      image: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/CoreT/25FW/Women/LineupBanner-w-Shortsleeve-pc-1-0630.jpg",
      subCategories: [
        { id: "cat_f_01_01", name: "Áo thun dài tay", slug: "long" },
        { id: "cat_f_01_02", name: "Áo thun ngắn tay", slug: "short" },
        { id: "cat_f_01_03", name: "Áo crop top", slug: "crop" },
        { id: "cat_f_01_04", name: "Áo tank top", slug: "tank" }
      ]
    },
    {
      id: "cat_f_02",
      name: "Váy",
      slug: "dress",
      image: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/467928/item/goods_09_467928.jpg",
      subCategories: [
        { id: "cat_f_02_01", name: "Váy ngắn", slug: "mini" },
        { id: "cat_f_02_02", name: "Váy midi", slug: "midi" },
        { id: "cat_f_02_03", name: "Váy dài", slug: "maxi" },
        { id: "cat_f_02_04", name: "Váy công sở", slug: "office" }
      ]
    },
    {
      id: "cat_f_03",
      name: "Quần",
      slug: "pants",
      image: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455360/item/goods_69_455360.jpg",
      subCategories: [
        { id: "cat_f_03_01", name: "Quần jean", slug: "jean" },
        { id: "cat_f_03_02", name: "Quần kaki", slug: "kaki" },
        { id: "cat_f_03_03", name: "Quần short", slug: "short" },
        { id: "cat_f_03_04", name: "Quần legging", slug: "legging" }
      ]
    },
    {
      id: "cat_f_04",
      name: "Áo khoác",
      slug: "jacket",
      image: "https://im.uniqlo.com/global-cms/spa/res3652b02d61bcd92ca043e051872f87eefr.jpg",
      subCategories: [
        { id: "cat_f_04_01", name: "Áo hoodie", slug: "hoodie" },
        { id: "cat_f_04_02", name: "Áo cardigan", slug: "cardigan" },
        { id: "cat_f_04_03", name: "Áo blazer", slug: "blazer" }
      ]
    }
  ],

  // ========== TRẺ EM (kids) ==========
  kids: [
    {
      id: "cat_k_01",
      name: "Áo thun",
      slug: "tshirt",
      image: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/CoreT/25SS/KIDS/LineupBanner-kids-Short_Sleeve-pc.jpg",
      subCategories: [
        { id: "cat_k_01_01", name: "Áo thun ngắn tay", slug: "short" },
        { id: "cat_k_01_02", name: "Áo thun dài tay", slug: "long" },
        { id: "cat_k_01_03", name: "Áo thun họa tiết", slug: "graphic" }
      ]
    },
    {
      id: "cat_k_02",
      name: "Quần",
      slug: "pants",
      image: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455361/item/goods_69_455361.jpg",
      subCategories: [
        { id: "cat_k_02_01", name: "Quần jean", slug: "jean" },
        { id: "cat_k_02_02", name: "Quần short", slug: "short" },
        { id: "cat_k_02_03", name: "Quần jogger", slug: "jogger" }
      ]
    },
    {
      id: "cat_k_03",
      name: "Áo khoác",
      slug: "jacket",
      image: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/Casual-Outer/25FW/KIDS/LineupBanner-k-Parkas-pc-1.jpg",
      subCategories: [
        { id: "cat_k_03_01", name: "Áo hoodie", slug: "hoodie" },
        { id: "cat_k_03_02", name: "Áo khoác gió", slug: "windbreaker" }
      ]
    }
  ]
};

// Helper function để lấy categories theo gender
export const getCategoriesByGender = (gender) => {
  return categoriesData[gender] || [];
};

// Helper function để lấy sub-categories
export const getSubCategories = (gender, categorySlug) => {
  const categories = categoriesData[gender] || [];
  const category = categories.find(cat => cat.slug === categorySlug);
  return category?.subCategories || [];
};
