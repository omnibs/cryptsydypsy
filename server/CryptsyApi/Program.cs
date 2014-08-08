using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.SelfHost;
using System.Windows.Forms;

namespace CryptsyApi
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            var config = new HttpSelfHostConfiguration("http://localhost:777");
            using (var server = new HttpSelfHostServer(config))
            {

                config.Routes.MapHttpRoute(
                    "API Default", "api/{controller}/{id}",
                    new { id = RouteParameter.Optional });


                server.OpenAsync().Wait();
                Console.ReadLine();

                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new MainForm());
            }
        }
    }
}
