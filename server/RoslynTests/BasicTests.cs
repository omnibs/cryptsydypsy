using System;
using System.Collections.Generic;
using System.Reflection;
using CryptsyApi.Roslyn;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace RoslynTests
{
    [TestClass]
    public class BasicTests
    {
        [TestMethod]
        public void HelloWord()
        {
            //var contracts = Assembly.Load("Lesula.Client.Contracts");
            //var core = Assembly.Load("Lesula.Core");

            var errors = new List<string>();

            // see if code compiles
            var assembly = AssemblyGenerator.CreateAssembly(
                "MyAssembly",
                new List<string> { "public class Test { public string Run(){ return \"Hello\"; } }" },
                new List<string> { "mscorlib", "System", "System.Core"},
                out errors);

            var a = assembly.GetType("Test");
            var b = Activator.CreateInstance(a);
            var c = a.InvokeMember("Run", BindingFlags.InvokeMethod | BindingFlags.Instance | BindingFlags.Public, null, b, null);
            Assert.AreEqual("Hello", c);
        }
    }
}
