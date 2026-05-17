class ApiResponse {
  constructor(statusCode, message, data = null, meta = null) {
    this.success = statusCode < 400;
    this.code = statusCode;
    this.message = message;
    
    if (data) {
      this.data = data;
      // Compatibility Layer: If data is an array, provide 'results' alias for legacy frontend components
      if (Array.isArray(data)) {
        this.results = data;
      }
    }
    
    if (meta) this.meta = meta;
  }
}

export default ApiResponse;
