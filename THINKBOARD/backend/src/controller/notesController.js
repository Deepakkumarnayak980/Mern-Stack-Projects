export function getAllNotes(req, res) {
  res.status(200).json({
    success: true,
    data: [],
    message: "Notes fetched successfully"
  });
}

export function createNotes(req, res) {
  res.status(201).json({
    success: true,
    message: "Note created successfully"
  });
}

export function updateNotes(req, res) {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    message: `Note with id ${id} updated successfully`
  });
}

export function deleteNotes(req, res) {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    message: `Note with id ${id} deleted successfully`
  });
}
