namespace CryptsyApi.Server.RuleContract
{
    public interface IRule
    {
        bool ShouldExecuteNow(IMarketData data);

        void Execute(IMarketData data);
    }
}
