export function sendJson(res, statusCode, data, message){
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  
  if(message && (data !== undefined && data !== null)){
    res.end(JSON.stringify({
      "success": true,
      message,
      data
    }));
  }else if(data !== undefined && data !== null){
    res.end(JSON.stringify({
      "success": true,
      data
    }));
  }else{
    res.end(JSON.stringify({
      "success": true,
      message
    }));
  }
}

export function sendError(res, statusCode, message){
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  
  res.end(JSON.stringify({
    "success": false,
    message
  }));
}