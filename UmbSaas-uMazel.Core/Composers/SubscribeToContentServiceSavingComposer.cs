using Umbraco.Core;
using Umbraco.Core.Composing;
using UmbSaas_uMazel.Core.Components;

namespace UmbSaas_uMazel.Core.Composers
{
    public class SubscribeToContentServiceSavingComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            composition.Components().Append<SubscribeToContentServiceSavingComponent>();
        }
    }
}