using System.Linq;
using System.Web;
using ImageProcessor.Web.Helpers;
using ImageProcessor.Web.HttpModules;

namespace UmbSaas_uMazel.Core.Components
{
    public class SubscribeToContentServiceSavingComponent : Umbraco.Core.Composing.IComponent
    {
        public void Initialize()
        {
            ImageProcessingModule.ValidatingRequest += ImageProcessingModule_ValidatingRequest;
        }

        private void ImageProcessingModule_ValidatingRequest(object sender, ValidatingRequestEventArgs e)
        {
            if (!e.Context.Request.Url.AbsolutePath.EndsWith(".gif"))
            {
                var queryString = HttpUtility.ParseQueryString(e.QueryString);
                if (e.Context.Request.AcceptTypes != null && e.Context.Request.AcceptTypes.Contains("image/webp"))
                {
                    queryString.Remove("format");
                    queryString["format"] = "webp";
                    if (queryString.Get("quality") != null)
                    {
                        string quality = queryString["quality"];
                        queryString.Remove("quality");
                        queryString["quality"] = quality;
                    }
                }
                e.QueryString = queryString.ToString();
            }
        }

        public void Terminate()
        {
        }
    }
}