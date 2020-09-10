const extractDomain = (url: string): string | null => {
  if (!url) return null
  var result = null
  let match = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
  )

  if (match) {
    result = match[1]
    if ((match = result.match(/^[^.]+\.(.+\..+)$/))) {
      result = match[1]
    }
  }
  return result
}

export default extractDomain
