import Link from "next/link";
import { Suspense } from "react";
import { Trans } from "react-i18next/TransWithoutContext";
import HowToEntry from "@/app/[lang]/(features)/lottery/_components/HowToEntry";
import HowToGetMedal from "@/app/[lang]/(features)/lottery/_components/HowToGetMedal";
import HowToGetTicket from "@/app/[lang]/(features)/lottery/_components/HowToGetTicket";
import LotteryInformation from "@/app/[lang]/(features)/lottery/_components/LotteryInformation";
import BackToTop from "@/app/[lang]/_components/Elements/BackToTop/BackToTop";
import { getTranslation } from "@/app/i18n/server";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";

const Lottery = async ({ lang }: { lang: string }) => {
	const { t } = await getTranslation(lang);
	// ToDo: Add Suspense
	return (
		<div className="container mx-auto h-dvh min-h-full pb-12">
			<Typography variant="h1" className="my-2 text-center text-pink-500">
				CryptoMaids Lottery
			</Typography>

			<div className="box-border rounded-2xl border-4 border-dashed border-pink-500 p-8 pb-4">
				<Suspense fallback={
					<div className="space-y-4">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-6 w-48" />
						<Skeleton className="h-6 w-40" />
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
							{Array.from({ length: 5 }).map((_, i) => (
								<Skeleton key={i} className="h-32 w-full" />
							))}
						</div>
					</div>
				}>
					<LotteryInformation lang={lang} />
				</Suspense>

				<Typography variant="h4" className="text-end underline">
					<Link href="lottery/summary">{t("lottery:pastLottery")}</Link>
				</Typography>
			</div>

			<Typography variant="h2" className="my-8 text-center text-pink-500">
				{t("lottery:howToEntry")}
			</Typography>
			<HowToEntry lang={lang} />

			<Typography
				variant="h2"
				className="mt-8 text-center text-pink-500 [&_span]:inline-block"
			>
				<Trans i18nKey="lottery:howToGetMedal" t={t} />
			</Typography>
			<Typography variant="lead" className="text-center">
				{t("lottery:howToGetMedalText")}
			</Typography>
			<HowToGetMedal lang={lang} />

			<Typography
				variant="h2"
				className="mt-8 text-center text-pink-500 [&_span]:inline-block"
			>
				<Trans i18nKey="lottery:howToGetTicket" t={t} />
			</Typography>
			<Typography variant="lead" className="text-center [&_span]:inline-block">
				<Trans i18nKey="lottery:howToGetTicketText" t={t} />
			</Typography>
			<HowToGetTicket lang={lang} />

			<BackToTop />
		</div>
	);
};

export default Lottery;
