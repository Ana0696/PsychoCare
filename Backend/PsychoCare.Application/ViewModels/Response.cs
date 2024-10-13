namespace PsychoCare.Application.ViewModels
{
    public class Response
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public Response() 
        {
            Success = true;
        }

        public Response(bool success, string message)
        {
            Success = success;
            Message = message;
        }
    }

    public class Response<T> : Response
    {
        public T Data { get; set; }

        public Response() { }

        public Response(T data)
        {
            Data = data;
            Success = true;
        }

        public Response(bool success, string message)
        {
            Success = success;
            Message = message;
        }
    }

}
