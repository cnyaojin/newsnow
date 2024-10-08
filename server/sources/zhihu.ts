interface Res {
  data: {
    card_label?: {
      icon: string
      night_icon: string
    }
    target: {
      id: number
      title: string
      url: string
      created: number
      answer_count: number
      follower_count: number
      bound_topic_ids: number[]
      comment_count: number
      is_following: boolean
      excerpt: string
    }
  }[]
}

export default defineSource(async () => {
  const url = "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=20&desktop=true"
  const res: Res = await $fetch(url)
  if (!res.data || res.data.length === 0) throw new Error("Cannot fetch data")
  return res.data
    .slice(0, 20)
    .map((k) => {
      return {
        id: k.target.id,
        title: k.target.title,
        extra: {
          icon: k.card_label?.night_icon,
        },
        url: `https://www.zhihu.com/question/${k.target.id}`,
      }
    })
})