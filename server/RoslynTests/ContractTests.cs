using System;
using System.Reflection;
using System.Collections.Generic;
using CryptsyApi.Roslyn;
using CryptsyApi.Server.RuleContract;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace RoslynTests
{
    /// <summary>
    /// Summary description for ContractTests
    /// </summary>
    [TestClass]
    public class ContractTests
    {
        [TestMethod]
        public void TestContractInstance()
        {
            var contracts = Assembly.Load("CryptsyApi.Server");
            //var core = Assembly.Load("Lesula.Core");

            var errors = new List<string>();

            #region code
            var code = @"using CryptsyApi.Server.RuleContract;
using CryptsyApi.Server;
public class Test : IRule {
    public bool ShouldExecuteNow(IMarketData data) { return true; }
    public void Execute(IMarketData data) { }     
}";
            #endregion

            // see if code compiles
            var assembly = AssemblyGenerator.CreateAssembly(
                "MyAssembly",
                new List<string> { code },

                new List<string> { "mscorlib", "System", "System.Core", contracts.Location },
                out errors);

            var a = assembly.GetType("Test");
            var b = Activator.CreateInstance(a) as IRule;
            var c = b.ShouldExecuteNow(null);
            Assert.AreEqual(true, c);
        }
    }
}
