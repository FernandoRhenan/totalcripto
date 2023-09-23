function status(request, response) {
  response.status(200).json({ statuss: "ok" })
}

export default status
